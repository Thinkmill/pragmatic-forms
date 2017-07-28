#  Thoughts and ideas - unformatted

- input formatting
	- adding spaces to a Credit card number
	- adding hypen and brackets to phone numbers
	- etc.
- parse, normalise

## More complicated forms by nesting components

- need to prevent the whole form form updating on every keypress (maybe just debounce/throttle, but delay submit events (eg. from Enter keypress) to be sure we capture all inputs)

Example: A credit card form inside a larger payment form.

```js

const CreditCard = ({ update, onValueChange, submit }) => ();

const Form = ({ update, onSubmit }) => (
	<form onSubmit={onSubmit}>
		<CreditCard
			onValueChange={update('creditCardDetails')}
		/>
		<BillingAddress
			onValueChange={update('billingAddress')}
		/>
		<SubmitButton />
	</form>
);

```

## Show examples of how to use this with Redux

- @connect()
- props in getInitialData()
