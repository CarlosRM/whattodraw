import { useState } from "react";
import styles from './App.module.css'
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { generatePrompt } from "./Prompts/prompts";
import { Checkbox, Stack } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: "#646cff",
            borderColor: "#646cff",
            _hover: {
              bg: "#646cff",
              borderColor: "#646cff",
            },
          },
          _hover: {
            borderColor: "#646cff",
          },
          p: 2, // padding interno del checkbox
        },
        label: {
          px: 2, // padding horizontal para el texto
        },
      },
    },
  },
  colors: {
    brand: {
      100: "#646cff",
      // ...
      900: "#1a202c",
    },
  },
});

export default function App() {
  const [prompt, setPrompt] = useState(generatePrompt());
  const [lighting, setLighting] = useState(false);
  const [atmosphere, setAtmosphere] = useState(false);
  const [style, setStyle] = useState(false);
  const [category, setCategory] = useState<"fantasy" | "classical" | "scifi" | "daily" | undefined>(undefined)
  const handleGenerate = () => {
    setPrompt(generatePrompt({ lighting, atmosphere, style, category }));
  };

  function handleCategory(newCategory:"fantasy" | "classical" | "scifi" | "daily") {
    setCategory(prev => {
      if(prev === newCategory) return undefined
      else return newCategory
    })
  }

  return (
    <ChakraProvider theme={customTheme}>
      <div className={styles.container}>
        <h1 className={styles.title}>What to draw?</h1>
        <Stack direction="row" spacing={6} mb={4} className={styles.filters}>
          <Checkbox
            isChecked={lighting}
            onChange={e => setLighting(e.target.checked)}
          >
            Lighting
          </Checkbox>
          <Checkbox
            isChecked={atmosphere}
            onChange={e => setAtmosphere(e.target.checked)}
          >
            Atmosphere
          </Checkbox>
          <Checkbox
            isChecked={style}
            onChange={e => setStyle(e.target.checked)}
          >
            Style
          </Checkbox>
        </Stack>
        <p className={styles.prompt}>{prompt}</p>
        <button onClick={handleGenerate} className={styles.button}>
          New prompt
        </button>
        <div className={styles.categories}>
          <button onClick={() => handleCategory('fantasy')} className={`${styles.button} ${category === 'fantasy' ? styles.selected : ''}`}>
            Fantasy
          </button>
          <button onClick={() => handleCategory('scifi')} className={`${styles.button} ${category === 'scifi' ? styles.selected : ''}`}>
            Sci-Fi
          </button>
          <button onClick={() => handleCategory('daily')} className={`${styles.button} ${category === 'daily' ? styles.selected : ''}`}>
            Daily Life
          </button>
          <button onClick={() => handleCategory('classical')} className={`${styles.button} ${category === 'classical' ? styles.selected : ''}`}>
            Classical
          </button>
        </div>
      </div>
    </ChakraProvider>
  );
}
