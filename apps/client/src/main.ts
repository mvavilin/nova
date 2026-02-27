import 'input.css';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

const registrationPage = new RegistrationPage();
if (registrationPage.element) {
  document.body.prepend(registrationPage.element);
}
