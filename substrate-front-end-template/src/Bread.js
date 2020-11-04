import React, { useEffect, useState } from 'react';
import { Input, Grid, Form } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

export default function Main (props) {
  const { api } = useSubstrate();
  const [numBread, setBread] = React.useState(0);
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ slices: 0 });
  const { accountPair } = props;

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { slices } = formState;

  React.useEffect(() => {
    // console.log(api.rpc);
    const unsub = api.query.bread.bread(numSlices => {
      if (numSlices && numSlices != numBread) {
        setBread(numSlices.toHuman());
      }
    });
  }, []);

  return (
    <Grid.Row style={{"justify-content": "center"}}>
      <Form>
      <h1>{numBread} slices of Bread!</h1>
        <Form.Field>
          Set the number of slices!
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Slices"
            type="number"
            placeholder="slices"
            state="slices"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: "center" }}>
          <TxButton
            accountPair={accountPair}
            label="Submit"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: "bread",
              callable: "setNumSlices",
              inputParams: [slices],
              paramFields: [true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Row>
  );
}