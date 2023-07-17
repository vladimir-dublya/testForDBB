import * as React from 'react';
import axios from 'axios';

class FilesService {
  async getFiles(token, pathForFile) {
    console.log('token: ', token);
    const response = await axios.post(
      'https://api.dropboxapi.com/2/files/list_folder',
      {
        path: pathForFile ? `/${pathForFile}` : '',
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
}

export const filesService = new FilesService();
