export interface InputFieldInterface {
  fieldTitle: string;
  placeHolder: string;
  type: string;
  mainIcon: React.ReactNode;
  formAuthInput: string;
  register: any;
  errors: any;
  setContent?: (val: string) => void;
}
