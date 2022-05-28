import CopyToClipboard from 'react-copy-to-clipboard'
import { PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import { vscDarkPlus as darkTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { materialLight as lightTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import py from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'

import { CopyIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

export interface CodeBlockProps {
  lang?: string,
  hideCopy?: boolean
  className?: string
  children?: ReactNode | ReactNode[]
  /**
   * Inline styling
   * Supports CSS Properties in camelCase
   */
  style?: React.CSSProperties | undefined
  /**
   * Lines to be highlighted.
   * Supports individual lines: '14', multiple lines: '14,15', or a range of lines '14..19'
   */
  highlightLines?: string
  hideBorder?: boolean
}

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('typescript', ts)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('python', py)
SyntaxHighlighter.registerLanguage('bash', bash)


function CodeBlock(props: CodeBlockProps) {
  const lang = props.lang || /language-(\w+)/.exec(props.className?? '')?.at(1) || 'js'
 

  return  (
    <div className="relative">
      <SyntaxHighlighter 
        language={lang}
        style={darkTheme}
        className={`
          overflow-hidden 
          ${props.hideBorder ? '' : 'border-slate-800 dark:border-slate-300 rounded-lg border'}
          `}
        customStyle={{
          padding: 0,
          fontSize: 12,
          lineHeight: 1.2,
          backgroundColor: '',
          ...props.style
        }}
        showLineNumbers={ lang === 'bash' ? false : true }
        lineNumberContainerStyle={{ paddingTop: '128px' }}
        lineNumberStyle={{
          display: 'inline-flex',
          justifyContent: 'flex-end',
          minWidth: '48px',
          marginRight: '12px',
          paddingTop: '4px',
          paddingBottom: '4px',
          paddingLeft: '21px',
          backgroundColor: '',
          fontSize: 12,
        }}
        wrapLines={true}
      >
        {props.children as string|string[]}
      </SyntaxHighlighter>

      {!props.hideCopy && props.children ? (
        <div className="dark absolute right-2 top-2">
          <CopyToClipboard text={props.children as string}>
            <button>
              <CopyIcon className="inline-block mr-1 mb-0.5"/>Copy
            </button>
          </CopyToClipboard>
        </div>
      ) : null}
      </div>
    )
}

export default CodeBlock