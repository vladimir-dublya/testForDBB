import * as React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

class FilesService {
  async getFiles(prop) {
    console.log('propPath:', prop.path);
    const response = await axios.post(
      'https://api.dropboxapi.com/2/files/list_folder',
      {
        path: prop.path,
      },
      {
        headers: {
          Authorization: `Bearer ${prop.token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  }
  async deleteFile(prop) {
    const response = await axios.post(
      'https://api.dropboxapi.com/2/files/delete_v2',
      {
        path: '/' + prop.file.name,
      },
      {
        headers: {
          Authorization: `Bearer ${prop.token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  }

  async getInfo(prop) {
    const response = await axios.post(
      'https://api.dropboxapi.com/2/files/get_metadata',
      {
        path: '/' + prop.file.name,
      },
      {
        headers: {
          Authorization: `Bearer ${prop.token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  }

  async uploadFile(prop) {
    const response = await axios.post(
      'https://content.dropboxapi.com/2/files/upload',
      prop.formData,
      {
        headers: {
          Authorization: `Bearer ${prop.token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  }
}

export const filesService = new FilesService();
