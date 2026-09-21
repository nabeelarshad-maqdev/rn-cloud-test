import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {login} from '../api/auth';
import {validateLoginCredentials} from '../utils/validation';

export type LoginScreenProps = {
  onLoginSuccess?: (email: string) => void;
};

export function LoginScreen({onLoginSuccess}: LoginScreenProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setFormError(undefined);
    setSuccessMessage(undefined);

    const result = validateLoginCredentials(email, password);
    setEmailError(result.errors.email);
    setPasswordError(result.errors.password);

    if (!result.valid) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await login({email, password});
      setSuccessMessage(`Welcome, ${response.user.email}`);
      onLoginSuccess?.(response.user.email);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container} testID="login-screen">
      <Text style={styles.title} accessibilityRole="header">
        Sign in
      </Text>
      <Text style={styles.subtitle}>Enter your email and password to continue.</Text>

      <Text nativeID="email-label" style={styles.label}>
        Email
      </Text>
      <TextInput
        testID="email-input"
        style={[styles.input, emailError ? styles.inputError : null]}
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(undefined);
        }}
        placeholder="you@example.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        accessibilityLabel="Email"
        accessibilityLabelledBy="email-label"
        editable={!isSubmitting}
      />
      {emailError ? (
        <Text testID="email-error" style={styles.error}>
          {emailError}
        </Text>
      ) : null}

      <Text nativeID="password-label" style={styles.label}>
        Password
      </Text>
      <TextInput
        testID="password-input"
        style={[styles.input, passwordError ? styles.inputError : null]}
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError(undefined);
        }}
        placeholder="At least 8 characters"
        secureTextEntry
        textContentType="password"
        accessibilityLabel="Password"
        accessibilityLabelledBy="password-label"
        editable={!isSubmitting}
      />
      {passwordError ? (
        <Text testID="password-error" style={styles.error}>
          {passwordError}
        </Text>
      ) : null}

      {formError ? (
        <Text testID="form-error" style={styles.error}>
          {formError}
        </Text>
      ) : null}

      {successMessage ? (
        <Text testID="success-message" style={styles.success}>
          {successMessage}
        </Text>
      ) : null}

      <Pressable
        testID="login-button"
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityLabel="Sign in"
        accessibilityState={{disabled: isSubmitting, busy: isSubmitting}}>
        {isSubmitting ? (
          <ActivityIndicator testID="login-spinner" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Sign in</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#111827',
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#dc2626',
  },
  error: {
    color: '#dc2626',
    fontSize: 13,
    marginBottom: 12,
  },
  success: {
    color: '#059669',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
