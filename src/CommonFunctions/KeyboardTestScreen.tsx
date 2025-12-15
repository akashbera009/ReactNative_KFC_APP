import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default function KeyboardTestScreen() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [input4, setInput4] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Keyboard Test (Built-in)</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Test Inputs</Text>
            
            <View style={{ height: 200, backgroundColor: '#f0f0f0', marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Spacer Area</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Input 1"
              value={input1}
              onChangeText={setInput1}
            />

            <TextInput
              style={styles.input}
              placeholder="Input 2"
              value={input2}
              onChangeText={setInput2}
            />

            <TextInput
              style={styles.input}
              placeholder="Input 3"
              value={input3}
              onChangeText={setInput3}
            />

            <TextInput
              style={styles.input}
              placeholder="Input 4 (Bottom)"
              value={input4}
              onChangeText={setInput4}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})