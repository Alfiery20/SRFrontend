 export  class utils {
  public static convertirTexto(textoBase: string) {
    var nuevoTexto = '';
    nuevoTexto =
      nuevoTexto + textoBase.charAt(0).toUpperCase() + textoBase.substring(1).toLowerCase();
    return nuevoTexto;
  }
}
