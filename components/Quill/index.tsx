'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from 'suneditor-react/dist/types/upload';
import { uploadImageFiles } from '@/services/upload.services';

import 'suneditor/dist/css/suneditor.min.css';
import './style.scss';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: true,
});

type Props = {
  contentEditor: string;
  onChangeContentEditor: (newContent: string) => void;
};

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
  'Sarabun',
];

export default function Editor({
  contentEditor,
  onChangeContentEditor,
}: Props) {
  const sortedFontOptions = [
    'Logical',
    'Salesforce Sans',
    'Garamond',
    'Sans-Serif',
    'Serif',
    'Times New Roman',
    'Helvetica',
    ...defaultFonts,
  ].sort();
  const handleImageUploadBefore = (
    files: File[],
    _: object,
    uploadHandler: UploadBeforeHandler
  ): UploadBeforeReturn => {
    let result: UploadBeforeReturn;

    (async () => {
      try {
        const res: any = await uploadImageFiles(files[0]);

        const result = [
          {
            url: res?.result,
            name: res?.originalname,
            size: 100,
          },
        ];

        uploadHandler({ result });
      } catch (error) {
        uploadHandler({
          errorMessage: 'Error uploading image',
          result: [],
        });
      }
    })();

    return result;
  };

  return (
    <>
      <SunEditor
        name='content'
        setContents={contentEditor || ''}
        onChange={onChangeContentEditor}
        setOptions={{
          height: '800',
          buttonList: [
            [
              'formatBlock',
              'font',
              'fontSize',
              'fontColor',
              'align',
              'paragraphStyle',
              'blockquote',
            ],
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['table', 'list'],
            ['link', 'image', 'video'],
            ['preview', 'print'],
            ['undo', 'redo'],
          ],
          defaultTag: 'div',
          showPathLabel: false,
          font: sortedFontOptions,
        }}
        onImageUploadBefore={handleImageUploadBefore}
      />
    </>
  );
}
