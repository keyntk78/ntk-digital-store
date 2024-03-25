import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { apiUpload } from '../../apis/app'
const TextEditor = ({
  size = '300px',
  nameKey,
  setValue,
  value,
  className,
  label
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={nameKey} className='font-semibold mb-2'>
          {label}
        </label>
      )}
      <div className='w-full relative block'>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onReady={(editor) => {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader
            ) => {
              return new MyUploadAdapter(loader)
            }

            editor.editing.view.change((writer) => {
              writer.setStyle(
                'min-height',
                `${size}`,
                editor.editing.view.document.getRoot()
              )
            })
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            setValue((prev) => ({ ...prev, [nameKey]: data }))
            // console.log(data)
          }}
        />
      </div>
    </div>
  )
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file) // Append the file to the FormData
        apiUpload(formData)
          .then((response) => {
            resolve({ default: response.metadata })
          })
          .catch((error) => {
            console.error('Error uploading file:', error)
            reject(error) // Reject with the error
          })
      })
    })
  }

  abort() {
    console.log('Upload aborted')
  }
}

export default TextEditor
