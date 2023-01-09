<script>
  import mermaid from "mermaid";

  mermaid.initialize({ startOnLoad: false });

  let input = "",
    output;

  function render() {
    mermaid.render("theGraph", input, function (svgCode) {
      output = svgCode;
    });
  }
</script>

<div>
  <pre class="mermaid">
    graph LR
        A --- B
        B-->C[fa:fa-ban forbidden]
        B-->D(fa:fa-spinner);
      </pre>
</div>

<div>
  <textarea
    on:keyup={render}
    bind:value={input}
    name=""
    id="input"
    cols="30"
    rows="10"
  />
</div>
<div>
  Graph:
  <div contenteditable="true" bind:innerHTML={output} />
</div>
