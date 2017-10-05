function funcao_teste(formulario_id) {
var teste_formulario = buscar_dados_do_formulario('#meu_formulario');
console.log(teste_formulario);
var docDefinition = {
  content: [
    { text: 'Exmos Senhores ', style: 'header' },
    ' ',
    'Somos uma empresa especializada no ramo de '+teste_formulario.area+' com trabalhos realizados na area. Estamos '+
    'preparados para dar resposta, a cada passo na concretizacao de pequenos, medios e grandes projectos. Oferecemos'+
    ' sempre uma solucao inteligente e economica, apresentando um quadro de tecnicos, mao-de-obra especializada e comprometidos com o servico'+
    'A seguir apresentamos a lista dos nossos servicos:',
    {text: teste_formulario.servicos},
    { text: 'Contribuimos de forma positva, com servicos realizados de acordo com as normas de qualidade necessarias em qualquer projecto.\n'+
            'Todos servicos por nos prestados incluem garantias dentro dos prazos acordados para sua realizacao. Estabelecemos uma relacao transparente com os nossos clientes, '+
            'oferecendo-lhes suporte atraves do atendimento diferenciado.\nColocamo-nos a vossa inteira disposicao para esclarecimentos eventuais, e aguardamos ansiosamente o vosso contacto!'
    },
    { text: 'Endereco: '+teste_formulario.endereco, style: [ 'header', 'anotherStyle' ]},
    { text: 'E-mail: '+teste_formulario.email, style: [ 'header', 'anotherStyle' ]}
  ],

  styles: {
    header: {
      fontSize: 12,
      bold: true
    },
    anotherStyle: {
      italics: true,
      alignment: 'left'
    }
  }
};      pdfMake.createPdf(docDefinition).open();
}

function buscar_dados_do_formulario(formulario_id) {
  var out = {};
      var s_data = $(formulario_id).serializeArray();
      //transform into simple data/value object
      for(var i = 0; i<s_data.length; i++){
          var record = s_data[i];
          out[record.name] = record.value;
      }
      return out;
}
