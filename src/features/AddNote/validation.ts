import * as yup from 'yup'
import { NoteData } from './types.ts'

const titleMaxLength = 25

export const noteValidationScheme: yup.ObjectSchema<NoteData> = yup.object().shape({
  title: yup.string()
      .required('Нужно указать название')
      .max(titleMaxLength, `Название не должно превышать ${titleMaxLength} символов`)
})