import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list'
import { models } from '../models';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FieldView from '../components/FieldView';
import DataModel from '../lib/DataModel';

const CalculatorScreen = () => {

  const data = models.map((model, index) => {
    return { key: index, value: model.name }
  })

  const [selected, setSelected] = React.useState<DataModel | null>(null)
  const [, updateState] = React.useState<object>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to Volato</Text>
      <Text style={styles.subHeader}>Please choose a data model</Text>

      <SelectList
        data={data}
        setSelected={(val: number) => {
          setSelected(models[val])
        }}
        save='key'
        placeholder="Select a model"
        boxStyles={{ width: 300, height: 50, marginVertical: 20 }}
      />

      <KeyboardAwareScrollView
        style={{
          flex: 1,
          width: '100%',
          padding: 16
        }}
        keyboardShouldPersistTaps="always"
      >
        {selected && Object.keys(selected.fields).map((key, index) => {
          const field = selected.fields[key]
          return <FieldView key={index} field={field} onChange={
            (value: string) => {
              setSelected(prev => {
                if (!prev) return null

                if (field.type === 'number')
                  prev.setFieldValue(key, Number(value))

                else
                  prev.setFieldValue(key, value)

                return Object.assign(Object.create(Object.getPrototypeOf(prev)), prev)


              })

              setTimeout(() => {
                console.log('selected', JSON.stringify(selected, null, 2))
                forceUpdate()
              }, 100)
            }
          } />
        })}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'gray',
  },
});

export default CalculatorScreen;
