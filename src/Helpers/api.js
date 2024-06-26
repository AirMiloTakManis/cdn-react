import { Cookies } from 'react-cookie';
import { endpoints as ep } from '../Configs/endpoints';

export const endpoints = ep;

const getErrorMessage = target => {
  let error = '';
  try {
    const msg = JSON.parse(target.responseText);
    error = msg?.message || msg?.error;
  } catch (e) {
    console.log({ e });
    error = 'Please try again';
  }
  return error;
};

// eslint-disable-next-line
export default ({
  endpoint,
  url,
  data = null,
  token = null,
  onSuccess = () => null,
  onFail = () => null,
  files,
  filesImage,
  filesDrawing,
  contentType,
  fileName = 'Filename',
  uploadPercent,
  isSignUp,
  siteBuddy = false,
}) => {
  console.log('calling API  ', endpoint, data);
  const xhr = new XMLHttpRequest();
  const isGet = endpoint ? endpoint[0].toLowerCase() === 'get' : url[0].toLowerCase() === 'get';
  let urlParams = '';
  if (isGet && !!data) {
    urlParams = `?${Object.entries(data)?.map((e) => e.join('=')).join('&')}`;
  }
  if (data) {
    console.log('data in API call', data);
  }
  if (url) {
    xhr.open(url[0], url[1]);
  } else if (endpoint) {
    xhr.open(endpoint[0], endpoint[1] + urlParams);
  }
  const requestHeaders = {
    Accept: 'application/json',
  };

  if (contentType) {
    requestHeaders['Content-Type'] = contentType;
  } else if (!files) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  if (!token) {
    const cookies = new Cookies();
    token = cookies.get('token');
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (siteBuddy) {
    requestHeaders['client-id'] = process.env.REACT_APP_SITE_BUDDY_ID;
    requestHeaders['client-secret'] = process.env.REACT_APP_SITE_BUDDY_SECRET;
  }

  if (contentType) {
    fetch(endpoint[1] + urlParams, {
      method: endpoint[0],
      headers: requestHeaders,
    })
      .then(r => r.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([blob]));
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        onSuccess();
      }).catch(onFail);
    return;
  }

  Object.keys(requestHeaders).forEach((header) => {
    xhr.setRequestHeader(header, requestHeaders[header]);
  });

  if (files && uploadPercent) {
    xhr.upload.onprogress = event => {
      const percents = Math.round((100 * event.loaded) / event.total);
      uploadPercent(percents);
    };

    xhr.upload.onerror = () => {
      console.log(`xhr upload :: Error during the upload: ${xhr.status}.`);
    };
  }

  xhr.onload = ({ target }) => {
    console.log('API status', target.status);

    const error = getErrorMessage(target);

    if (target.status === 401) {
      console.log('API failed', target);
      if (isSignUp) return onFail(error);
      window.location = '/logout';
      onFail(error);
      return;
    }
    if (target.status === 403) {
      window.location = '/denied';
      return;
    }
    if (target.status > 299) {
      console.log('API failed', target);

      onFail(error);
      return;
    }

    if (target.status === 204) {
      onSuccess({});
    } else {
      try {
        const responseJson = JSON.parse(target.responseText);
        console.log('API success ', endpoint, data, responseJson);
        onSuccess(responseJson);
      } catch (e) {
        console.log('API success but failed to parse to JSON');
        console.log({ error: e, responseText: target.responseText });
      }
    }
  };

  xhr.onerror = (error) => {
    console.log('API failed', error);
    error = getErrorMessage(error);
    // toast.error(error);
    onFail(error);
  };

  if (files || filesImage || filesDrawing || data) {
    if (!!files || !!filesImage || !!filesDrawing) {
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
        });
      }
      if (!!files) files.forEach(f => formData.append('files', f));
      if (!!filesImage) filesImage.forEach(f => formData.append('filesImage', f));
      if (!!filesDrawing) filesDrawing.forEach(f => formData.append('filesDrawing', f));
      xhr.send(formData);
    } else {
      xhr.send(JSON.stringify(data));
    }
  } else {
    xhr.send();
  }

  return xhr;
};
