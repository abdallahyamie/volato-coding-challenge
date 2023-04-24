import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native';
import { DataField } from '../types';
import * as Clipboard from 'expo-clipboard';

const FieldView = ({ field, onChange }: { field: DataField, onChange: (value: string) => void }) => {

  const [error, setError] = React.useState<string | null>(null)
  const [value, setValue] = React.useState<string | undefined>(field?.value?.toString())


  React.useEffect(() => {
    setValue(field?.value?.toString())
  }, [field.value])

  const handleOnChangeText = (text: string) => {
    setValue(text)

    if (field.type === 'number' && isNaN(Number(text))) {
      setError('Invalid number')
      return
    }

    if (field.type === 'int' && (isNaN(Number(text)) || !Number.isInteger(Number(text)))) {
      setError('Invalid integer')
      return
    }

    if (field.type === 'float' && (isNaN(Number(text)) || Number.isInteger(Number(text)))) {
      setError('Invalid float')
      return
    }

    setError(null)
    onChange(text)
  }

  const handleCopy = async () => {
    // TODO: Copy to clipboard
    if (!value) return

    await Clipboard.setStringAsync(value)

    console.log('Copied to clipboard')
  }

  return (
    <View style={styles.container}>

      <Text>{field.label} : </Text>
      <TextInput
        style={[
          styles.input,
          error ? styles.errorInput : undefined,
          field.readOnly ? { backgroundColor: '#f0f0f0', paddingRight: 40 } : undefined
        ]}
        value={value}
        editable={!field.readOnly}
        onChangeText={handleOnChangeText}
      />
      {field.readOnly &&
        <Pressable onPress={handleCopy} style={styles.copyBtn}>
          <Image source={require('../assets/copy.png')} style={{ width: 20, height: 20 }} />
        </Pressable>
      }
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10

  },
  input:
  {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#808080',
    height: 50,
    width: '100%',
    padding: 10,
  },
  copyBtn: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  errorInput: {
    borderColor: 'red',
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  }
});

export default FieldView;
