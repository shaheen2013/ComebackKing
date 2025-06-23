/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs'; // Fixed import path

const MODEL_NAME = 'Diplomat.gguf';
const API_URL =
  'https://wab3pq2f9i.execute-api.us-east-1.amazonaws.com/dev/gguf_model';
const API_KEY = '28Aqu4MqAHaBo0VMS1z8897tuW2z4EFcHFxqRD5b';
const MAX_RETRIES = 3; // Added retry limit

export const useDownloadModel = () => {
  const [isModelReady, setIsModelReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null); // Track errors
  const downloadingRef = useRef(false);
  const retryCountRef = useRef(0);
  const modelPath = `file://${RNFS.DocumentDirectoryPath}/${MODEL_NAME}`;

  useEffect(() => {
    const checkAndDownload = async () => {
      try {
        const fileExists = await RNFS.exists(modelPath);
        if (fileExists) {
          setIsModelReady(true);
          return;
        }

        if (downloadingRef.current || retryCountRef.current >= MAX_RETRIES) {
          return;
        }
        downloadingRef.current = true;
        setError(null);

        // Fetch download URL
        const apiResponse = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({
            version: 'gguf-v0.1-stable',
            expiration: 3600,
          }),
        });

        if (!apiResponse.ok) {
          throw new Error(`API error: ${apiResponse.status}`);
        }

        const {url: downloadUrl} = await apiResponse.json();

        // Download with progress
        const downloadPromise = RNFS.downloadFile({
          fromUrl: downloadUrl,
          toFile: modelPath,
          begin: () => {},
          progress: (res: {bytesWritten: number; contentLength?: number}) => {
            // Handle potential missing contentLength
            const contentLength = res.contentLength || 1;
            const percent = Math.floor(
              (res.bytesWritten / contentLength) * 100,
            );
            setProgress(percent);
          },
        }).promise;

        await downloadPromise;
        setIsModelReady(true);
      } catch (err) {
        console.error('Download failed:', err);
        setError(`Download failed: ${(err as Error).message}`);

        // Retry logic
        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          setTimeout(checkAndDownload, 30000); // Retry after 3s
        }
      } finally {
        downloadingRef.current = false;
      }
    };

    checkAndDownload();
  }, []);

  return {isModelReady, modelPath, progress, error};
};
