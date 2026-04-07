import Button from '@/components/common/Button';
import TextFormField from '@/components/inputs/text/TextFormField';
import { loginRequest } from '@/features/auth/login/redux/loginSlice';
import { useAppDispatch } from '@/store/hook';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from "yup";

type FormValues = {
  user: string;
  pass: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  user: yup
    .string()
    .required("Vui lòng nhập tên đăng nhập"),
  pass: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(/^.{6,}$/, "Mật khẩu  ít nhất 6 ký tự"),
})

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    event?.preventDefault();
    dispatch(loginRequest({ user: data.user, password: data.pass, device: 'web' }))
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className='font-bold text-2xl text-center mb-6'>Đăng nhập</div>
        {/* refactor chỗ này */}
        <div className='flex flex-col gap-2'>
          <div className='form-row'>
            <div className="text-text-subtitle w-1/3 flex">Server</div>
            <div>UAT</div>
          </div>
          <div className='form-row'>
            <div className="text-text-subtitle w-1/3 flex">
              ID
              <span className='text-red-500!'>*</span>
            </div>
            <TextFormField name="user" className='flex-1' />
          </div>
          <div className='form-row'>
            <div className="text-text-subtitle w-1/3 flex">
              Password
              <span className='text-red-500!'>*</span>
            </div>
            <TextFormField name="pass" className='flex-1' type='password' />
          </div>
          <div className='flex justify-center mt-2'>
            <Button type="submit">Đăng nhập</Button>
          </div>
        </div>
      </form>
    </FormProvider >
  )
}

export default LoginForm;