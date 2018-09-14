import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A status indicates someone's or something's state."
      examplePath="components/Status/Types/StatusExample"
    />
    <ComponentExample
      title="State"
      description="A status can indicate common states."
      examplePath="components/Status/Types/StatusTypeExample"
    />
  </ExampleSection>
)

export default Types
