import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BRAND, ROUTES } from '@/lib/constants'
import PageShell from '@/components/PageShell'
import Button from '@/components/Button'
import styles from './Auth.module.scss'

type Mode = 'signin' | 'signup'

interface Fields {
  name: string
  email: string
  password: string
  confirm: string
}

type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', email: '', password: '', confirm: '' }

// Deliberately loose. Anything stricter starts rejecting addresses that are
// perfectly valid, and the only check that really settles it is sending mail.
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validate = (mode: Mode, fields: Fields): Errors => {
  const errors: Errors = {}

  if (mode === 'signup' && fields.name.trim().length < 2) {
    errors.name = 'Tell us what to call you.'
  }

  if (!looksLikeEmail(fields.email.trim())) {
    errors.email = 'That does not look like an email address.'
  }

  if (fields.password.length < 8) {
    errors.password = 'At least 8 characters, please.'
  }

  if (mode === 'signup' && fields.confirm !== fields.password) {
    errors.confirm = 'The two passwords are different.'
  }

  return errors
}

const Auth = () => {
  const [mode, setMode] = useState<Mode>('signin')
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const signup = mode === 'signup'

  const switchTo = (next: Mode) => {
    setMode(next)
    setErrors({})
    setSubmitted(false)
  }

  const set = (key: keyof Fields) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFields((prev) => ({ ...prev, [key]: value }))
    // Clear the complaint as soon as the field is touched. Leaving it under a
    // field somebody is actively fixing reads as though it is still wrong.
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const found = validate(mode, fields)
    setErrors(found)

    // There is nothing behind this yet. Rather than pretend a session, the
    // form says so -- everything up to the request is real, so wiring it to
    // Supabase later is one call in this handler.
    if (Object.keys(found).length === 0) setSubmitted(true)
  }

  const field = (key: keyof Fields) =>
    [styles.field, errors[key] ? styles.invalid : ''].filter(Boolean).join(' ')

  return (
    <PageShell
      kicker={signup ? 'Become a citizen of' : 'Welcome back to'}
      title={signup ? 'sweetopia' : 'the kingdom'}
      lead={
        signup
          ? 'An account keeps your cart, your orders and your favourites between visits.'
          : `Sign in to pick up where you left off in ${BRAND}.`
      }
    >
      <div className={styles.card}>
        <div className={styles.tabs} role="tablist" aria-label="Sign in or register">
          <button
            type="button"
            role="tab"
            aria-selected={!signup}
            className={[styles.tab, !signup ? styles.tabOn : ''].filter(Boolean).join(' ')}
            onClick={() => switchTo('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={signup}
            className={[styles.tab, signup ? styles.tabOn : ''].filter(Boolean).join(' ')}
            onClick={() => switchTo('signup')}
          >
            Register
          </button>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {signup ? (
            <label className={field('name')}>
              <span className={styles.label}>Name</span>
              <input
                type="text"
                value={fields.name}
                onChange={set('name')}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'err-name' : undefined}
                placeholder="Sugar Queen"
              />
              {errors.name ? (
                <span id="err-name" className={styles.error}>
                  {errors.name}
                </span>
              ) : null}
            </label>
          ) : null}

          <label className={field('email')}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              value={fields.email}
              onChange={set('email')}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'err-email' : undefined}
              placeholder="you@sweetopia.test"
            />
            {errors.email ? (
              <span id="err-email" className={styles.error}>
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className={field('password')}>
            <span className={styles.label}>Password</span>
            <input
              type="password"
              value={fields.password}
              onChange={set('password')}
              autoComplete={signup ? 'new-password' : 'current-password'}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'err-password' : undefined}
              placeholder="At least 8 characters"
            />
            {errors.password ? (
              <span id="err-password" className={styles.error}>
                {errors.password}
              </span>
            ) : null}
          </label>

          {signup ? (
            <label className={field('confirm')}>
              <span className={styles.label}>Repeat the password</span>
              <input
                type="password"
                value={fields.confirm}
                onChange={set('confirm')}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirm)}
                aria-describedby={errors.confirm ? 'err-confirm' : undefined}
              />
              {errors.confirm ? (
                <span id="err-confirm" className={styles.error}>
                  {errors.confirm}
                </span>
              ) : null}
            </label>
          ) : null}

          <Button type="submit" variant="solid" icon="icon-arrow-right" sparkle>
            {signup ? 'Create the account' : 'Sign in'}
          </Button>

          {submitted ? (
            <p className={styles.notice} role="status">
              The form is complete, but there is nowhere to send it yet &mdash; accounts arrive
              with the database.
            </p>
          ) : null}
        </form>

        <p className={styles.aside}>
          {signup ? 'Already a citizen? ' : 'No account yet? '}
          <button
            type="button"
            className={styles.swap}
            onClick={() => switchTo(signup ? 'signin' : 'signup')}
          >
            {signup ? 'Sign in' : 'Register'}
          </button>
        </p>
      </div>

      <Link to={ROUTES.PRODUCTS} className={styles.skip}>
        Or just look at the sweets &rarr;
      </Link>
    </PageShell>
  )
}

export default Auth
