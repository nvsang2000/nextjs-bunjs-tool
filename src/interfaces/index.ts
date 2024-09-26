export interface FormProps {
    initialValues: any;
    id: string | undefined;
    onSubmit: (value: any) => void;
    onRemove: (id: string) => void;
    loading: boolean;
  }
  