import React, { useState, useEffect, useRef } from 'react'
import styles from './styles'
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Picker,
  Vibration,
} from 'react-native'
import padStart from 'lodash/padStart'
import range from 'lodash/range'

const AVAILABLE_MINUTES = range(10).map(e => e.toString())
const AVAILABLE_SECONDS = range(60).map(e => e.toString())

const getRemaining = time => {
  const minutes = ~~(time / 60)
  const seconds = time - minutes * 60

  return {
    minutes: padStart(minutes, 2, '0'),
    seconds: padStart(seconds, 2, '0'),
  }
}

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
const useCompare = val => {
  const prevVal = usePrevious(val)

  return prevVal !== val
}

const App = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedMinutes, setSelectedMinutes] = useState('0')
  const [selectedSeconds, setSelectedSeconds] = useState('5')
  let interval = useRef()
  const countRef = useRef()

  // clear interval on unmount
  useEffect(() => {
    return () => clearInterval(interval.current)
  }, [])

  const isRunningChanged = useCompare(isRunning)
  useEffect(() => {
    if (isRunningChanged && isRunning) {
      countRef.current = remainingSeconds
      interval.current = setInterval(() => {
        if (countRef.current === 0) {
          stop()
          onComplete()
        } else {
          const seconds = countRef.current - 1
          setRemainingSeconds(seconds)
          countRef.current = seconds
        }
      }, 1000)
    }
  }, [isRunning])

  const start = () => {
    const seconds = parseInt(selectedMinutes) * 60 + parseInt(selectedSeconds)
    setRemainingSeconds(seconds)
    setIsRunning(true)
  }

  const stop = () => {
    interval.current = clearInterval(interval.current)
    setIsRunning(false)
  }

  const onComplete = () => {
    alert('Time is up...')
    const PATTERN = [100, 200, 300]
    Vibration.vibrate(PATTERN)
  }

  const renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        mode="dropdown"
        selectedValue={selectedMinutes}
        onValueChange={value => setSelectedMinutes(value)}
      >
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item
            styles={styles.pickerItem}
            key={value}
            label={value}
            value={value}
          />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>minutes</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        mode="dropdown"
        selectedValue={selectedSeconds}
        onValueChange={value => setSelectedSeconds(value)}
      >
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>seconds</Text>
    </View>
  )

  const { minutes, seconds } = getRemaining(remainingSeconds)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {isRunning ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        renderPickers()
      )}

      <TouchableOpacity
        onPress={isRunning ? stop : start}
        style={[styles.button, isRunning && styles.buttonStop]}
      >
        <Text style={[styles.buttonText, isRunning && styles.buttonTextStop]}>
          {isRunning ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default App
