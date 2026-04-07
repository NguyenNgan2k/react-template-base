import Button from '@/components/common/Button';
import TextFormField from '@/components/inputs/text/TextFormField';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from "yup";

type FormValues = {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  oldPass: yup
    .string()
    .required("Vui lòng nhập mật khẩu cũ"),
  newPass: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .matches(/^.{6,}$/, "Mật khẩu mới phải có ít nhất 6 ký tự"),
  confirmPass: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("newPass")], "Mật khẩu xác nhận không khớp")
    .matches(/^.{6,}$/, "Mật khẩu xác nhận phải có ít nhất 6 ký tự"),
})

const ForceChangePassForm = () => {
  const dispatch = useDispatch()
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    event?.preventDefault();

  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className='font-bold text-2xl text-center mb-6'>Đổi mật khẩu</div>
        <div className='flex flex-col gap-2'>
          <div className='form-row'>
            <div className="text-text-subtitle w-1/3 flex">
              Mật khẩu cũ
              <span className='text-red-500!'>*</span>
            </div>
            <TextFormField name="oldPass" className='flex-1' type='password' />
          </div>
          <div className='form-row'>
            <div className="text-text-subtitle w-1/3 flex">
              Mật khẩu mới
              <span className='text-red-500!'>*</span>
            </div>
            <TextFormField name="newPass" className='flex-1' type='password' />
          </div>
          <div className='form-row'>
            <div className="text-text-subtitle w-1/3 flex">
              Nhập lại mật khẩu
              <span className='text-red-500!'>*</span>
            </div>
            <TextFormField name="confirmPass" className='flex-1' type='password' />
          </div>
          <div className='flex justify-center mt-2'>
            <Button type="submit">Xác nhận</Button>
          </div>
        </div>
      </form>
    </FormProvider >
  )
}

export default ForceChangePassForm;