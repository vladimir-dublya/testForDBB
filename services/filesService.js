import * as React from 'react';
import axios from 'axios';

class FilesService {
  async getFiles(token) {
    console.log('getFiles');
    const response = await axios.post(
      'https://api.dropboxapi.com/2/files/list_folder',
      {
        path: '',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
}

export const filesService = new FilesService();
