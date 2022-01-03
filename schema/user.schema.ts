import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
    }),
    email: string({
      required_error: 'email is required',
    }).email('should be a valid email'),
    password: string({
      required_error: 'password is required',
    }).min(8, 'minimal have 8 character'),
    passwordConfirmation: string({
      required_error: 'password confirmation is required'
    })
  }).refine((data) => data.password === data.passwordConfirmation,{
    message: 'password confirmation not match',
    path: ['passwordConfirmation']
  })
})