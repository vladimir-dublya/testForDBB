import * as React from 'react';
import axios from 'axios';

class FilesService {
  getFiles(token) {
    try {
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
  
        console.log('Files:', response.data.entries);
      } catch (error) {
        console.error('Error listing files:', error);
      }
  }
}

export const filesService = new FilesService();
