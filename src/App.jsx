import { useState } from "react";
import "./App.css";

function App() {
  const [valueTextArea, setValueTextArea] = useState();
  const [valueDDD, setValueDDD] = useState();
  const [valueTel, setValueTel] = useState();
  const [valueLink, setValueLink] = useState();
  const [valueQRCode, setValueQRCode] = useState();

  function heandleNext(e) {
    e.preventDefault();
    if (e.target.value.length === 2) {
      e.target.nextElementSibling.focus();
      return false;
    }
  }

  function heandleFormat(e) {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,4})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : +x[1] + " " + x[2] + (x[3] ? "-" + x[3] : "");
  }

  var link;

  function tel() {
    const api = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=";

    const str = ("+55" + valueDDD + valueTel)
      .replace(/-/g, "")
      .replace(/\s/g, "");

    link = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      str
    )}&text=${encodeURIComponent(valueTextArea)}`;

    setValueLink(link)
    setValueQRCode(api + link)

    
    // document.getElementById("qrcode-image").src = api + link;

    // if (!tel || tel.length === 0 || !ddd || ddd.length === 0) {
    //   document.querySelector(".error").classList.add("active");
    //   document.querySelector(".geracao").classList.remove("active");
    // } else {
    //   document.querySelector(".geracao").classList.add("active");
    //   document.querySelector(".error").classList.remove("active");
    // }
  }

  console.log(link)

  function copyText() {
    console.log(link)
    const text = link;
    navigator.clipboard.writeText(text);
    console.log(text)

    document.querySelector("#copiado").classList.add("active");

    setTimeout(() => {
      document.querySelector("#copiado").classList.remove("active");
    }, 3000);
  }

  function addText({ target }) {
    setValueTextArea(target.innerText);
  }

  return (
    <div className="App">
      <div class="info-header">
        <p>Uma nova versão já está em desenvolvimento🥳</p>
      </div>
      <header>
        <div class="container">
          <ul>
            <li>
              <a href="https://web.whatsapp.com/"> WHATSAPP WEB</a>
            </li>
            <li>
              <a href="#">FUNCIONALIDADES </a>
            </li>
            <li>
              <a href="#">AJUDA </a>
            </li>
          </ul>
        </div>
      </header>
      <section>
        <div class="container">
          <div class="left">
            <h1>Gere links para seu WhatsApp de forma rápida e simples.</h1>
            <p class="description">
              Gere links direto para o seu chat do WhatsApp com mensagens pré
              definidas para seus trabalhos.
            </p>
            <div class="form">
              <div class="form__control">
                <label for="">Número de celular</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setValueDDD(e.target.value);
                    heandleNext(e);
                  }}
                  id="ddd"
                  maxLength="2"
                />
                <input
                  type="tel"
                  onChange={(e) => {
                    heandleFormat(e);
                    setValueTel(e.target.value);
                  }}
                  id="tel"
                  maxlength="11"
                />
              </div>
              <div class="form__control">
                <label for="">Sua mensagem (Opcional) </label>
                <div class="suggest">
                  <div class="suggest-messager">
                    <button class="messager" onClick={(e) => addText(e)}>
                      Oi
                    </button>
                    <button class="messager" onClick={(e) => addText(e)}>
                      Olá
                    </button>
                    <button class="messager" onClick={(e) => addText(e)}>
                      Bom dia
                    </button>
                    <button class="messager" onClick={(e) => addText(e)}>
                      Boa tarde
                    </button>
                    <button class="messager" onClick={(e) => addText(e)}>
                      Boa noite
                    </button>
                    <button class="messager" onClick={(e) => addText(e)}>
                      Olá, tudo bem?
                    </button>
                  </div>
                </div>
                <textarea
                  name=""
                  id="text"
                  cols="30"
                  rows="5"
                  onChange={(e) => {
                    setValueTextArea(e.target.value);
                  }}
                  value={valueTextArea}
                  placeholder="Degite sua mensagem"
                ></textarea>
              </div>
              <button type="submit" onClick={() => tel()} class="form__submit">
                Gerar link do WhatsApp
              </button>
            </div>
            <div class="error">
              <div class="message-error">
                <p>Ops! parece que vc não adicionou um número válido 😥</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="geracao active">
              <div class="link-gerado">
                <div class="titulo-link">
                  <p>🎉 Pronto! Agora é só copiar</p>
                  <img src="/images/copy.svg" alt="" />
                </div>
                <div class="link">
                  <p id="link-whats">{valueLink}</p>
                  <div id="copiado">
                    <p>Link copiado com sucesso! 🎉✨</p>
                  </div>
                  <button onClick={()=> copyText()} id="copy">
                    <img src="/images/copy.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="qrcode">
                <div class="src">
                  <img id="qrcode-image" src={valueQRCode} alt="" />
                </div>
                <div>
                  <p>Baixe e compartilhe o link via QRCode</p>

                  <a
                    class="btn-download"
                    id="btn-download"
                    href="dataURL"
                    target="_blank"
                    download="image.png"
                  >
                    Baixar QRCode
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="canvas"></div>
      </section>
      <footer>
        <div class="container"></div>
      </footer>
    </div>
  );
}

export default App;
