import Dashboard from './Containers/Dashboard';
import ErrorBoundary from './Components/ErrorBoundary';
import { Container } from 'react-bootstrap';
import Loading from "./Components/Loading";

function App() {
  return (
    <Loading>
      <Container>
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
      </Container>
    </Loading>
  );
}

export default App;
