import type { ButtonComponent, InputComponent } from '@/api/ComponentsAPI';

const invalidClassName = 'border-red';
const disabledClassName = 'pointer-events-none bg-light-disabled text-dark-disabled';

export function checkForm(
  inputArray: InputComponent[],
  buttonSubmit: ButtonComponent | null
): void {
  if (inputArray.length === 0 || buttonSubmit === null) return;

  const isInvalid = inputArray.find(
    (input) => input.hasClasses(invalidClassName) || input.isEmpty()
  );

  if (isInvalid) {
    buttonSubmit.setClasses(disabledClassName);
    buttonSubmit.setAttributes({ disabled: true });
  } else {
    buttonSubmit.removeClasses(disabledClassName);
    buttonSubmit.removeAttributes('disabled');
  }
}
