import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterLeadMutation } from '../services/leadApi';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: string[];
}

const SERVICE_OPTIONS = [
  { value: 'DELIVERY', label: 'Delivery' },
  { value: 'PICKUP', label: 'Pick-up' },
  { value: 'PAYMENT', label: 'Payment' },
];

export const RegistrationForm: React.FC = () => {
  const [registerLead, { isLoading, error, isSuccess }] = useRegisterLeadMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Form data submitted:", data);
    try {
      await registerLead(data).unwrap();
      reset();
    } catch (err) {
    //   console.error('Registration failed:', err);
    console.log("Registration failed:", JSON.parse(err as string));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register for Brighte Eats</h2>
      
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Registration successful!
        </div>
      )}
      
      {Boolean(error) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Registration failed. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            {...register('mobile', { required: 'Mobile is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postcode</label>
          <input
            {...register('postcode', { required: 'Postcode is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.postcode && <span className="text-red-500 text-sm">{errors.postcode.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services of Interest
          </label>
          {SERVICE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                value={option.value}
                {...register('services', { required: 'Please select at least one service' })}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">{option.label}</label>
            </div>
          ))}
          {errors.services && <span className="text-red-500 text-sm">{errors.services.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};