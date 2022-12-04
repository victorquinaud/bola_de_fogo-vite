import { useState } from "react";
import { Form } from "./style";

type Props = {
  setList: React.Dispatch<string[]>
}

const tempList = "1 - Pedro\n1 - Pedro\n2 - Lucas\n3- João\n4- Marcos\n5 -Paula\n6 -Secão\n7 Gui\n8 Manu\n9Fernando\n10Maurício\nFelipe\nVitor\n- Kátia\n- Laura\n-Júlia\n-Joaquim\n -Negão\n -Matheusinho\n\n \n  \n-\n";

const listArrToListString = (players: string[]) => {
  let str = "";
  const length = players.length;
  players.forEach((name, i) => {
      if (name !== "\n")
          if (i !== length - 1)
              str += `${i + 1} - ${name}\n`;
          else
              str += `${i + 1} - ${name}`;
  })
  return str;
};

const listStringToListArray = async (listString: string): Promise<string[] | any> => {
  return new Promise((resolve, reject) => {
    if (!listString) {
      reject(`the list is empty`);
      return;
    }

    const isString = (element: string) => {
      if (typeof element !== "string")
        return false;
      else
        return element.toLowerCase() !== element.toUpperCase();
    }

    const lines = listString.split("\n");
    const clenedLines = lines.map(line => line.split(" ").map(word => word.split("").map(letter => {
      if (isString(letter))
        return letter.toUpperCase();
      else
        return "";
      // join letters to word
    }).join("")
      // join words to line
      // removing spaces
    ).join(" ").trim()
      // removing array void elements
    ).filter(Boolean);

    const listArray = [...new Set(clenedLines)]
    resolve(listArray);
  });
}

const InputList = ({ setList }: Props) => {
  const [listString, setListString] = useState<string>(tempList);

  const submit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const listArray = await listStringToListArray(listString);
    const newListString = listArrToListString(listArray);
    setList(listArray);
    setListString(newListString);
  }

  return (
    <Form>
      <input
        type="textarea"
        value={listString}
        onChange={e => setListString(e.target.value)}
      />
      <button
        onClick={e => submit(e)}
      >Corrigir Lista</button>
    </Form>
  )
};

export default InputList;