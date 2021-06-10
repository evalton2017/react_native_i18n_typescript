import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, Header } from 'react-native-elements';
import Routes from './src/navigation';
import './src/locales';

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <ThemeProvider>
        <Header />
          <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;