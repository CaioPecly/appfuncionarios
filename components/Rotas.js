// components/Rotas.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Alterar from './Alterar';
import Cadastro from './Cadastro'; // sua outra tela de cadastro
import Auth from './Auth'; // tela de Login + Cadastro que criamos

const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} options={{ title: 'Login / Cadastro' }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Alterar" component={Alterar} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
