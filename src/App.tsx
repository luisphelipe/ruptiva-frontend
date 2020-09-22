import React from 'react'

import AuthService from './services/auth.service'
import BooksService from './services/books.service'

import Routing from './routes'

import { FlexContainerCenter } from './components/containers'

function App() {
  return (
    <AuthService>
      <BooksService>
        <FlexContainerCenter>
          <Routing />
        </FlexContainerCenter>
      </BooksService>
    </AuthService>
  )
}

export default App
