import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        Welcome to NGO App! Our mission is to empower communities through education, healthcare, and social initiatives.
      </Text>
      <Text style={styles.subtitle}>Our Vision</Text>
      <Text style={styles.text}>
        We strive to create a world where every individual has access to basic needs and opportunities for a better future.
      </Text>
      <Text style={styles.subtitle}>Contact Us</Text>
      <Text style={styles.text}>Email: contact@ngoapp.org</Text>
      <Text style={styles.text}>Phone: +123 456 7890</Text>
      <Text style={styles.text}>Address: 123 NGO Street, City, Country</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});
