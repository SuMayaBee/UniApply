// App.tsx (project root)
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/Common/Store/configureStore';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PersistGate>
  </ReduxProvider>
);

export default App;
