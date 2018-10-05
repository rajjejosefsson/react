import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Primary divider"
      description="A primary divider shows emphasis."
      examplePath="components/Divider/Variations/DividerExamplePrimary"
    />
    <ComponentExample
      title="Important"
      description="A divider can appear more important and draw the user's attention."
      examplePath="components/Divider/Variations/DividerExampleImportant"
    />
    <ComponentExample
      title="Size"
      description="A divider can have different sizes."
      examplePath="components/Divider/Variations/DividerExampleSize"
    />
  </ExampleSection>
)

export default Variations
