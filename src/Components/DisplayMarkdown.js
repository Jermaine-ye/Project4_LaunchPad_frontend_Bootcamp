import { useEffect, useState } from 'react';
import './css/DisplayMarkdown.css';
import Markdown from 'markdown-to-jsx';
import Code from './Code';
import axios from 'axios';

function DisplayMarkdown({ markdown }) {
  const [post, setPost] = useState('');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (markdown) {
      const getProps = async () => {
        axios.get(markdown).then((res) => setPost(res.data));
      };
      getProps();
    }
  }, [markdown]);

  return (
    <div className="DisplayMarkdown-body">
      <Markdown
        options={{
          overrides: {
            Code: {
              component: Code,
              props: {
                isDark,
                setIsDark,
              },
            },
          },
        }}
      >
        {post}
      </Markdown>
    </div>
  );
}

export default DisplayMarkdown;
