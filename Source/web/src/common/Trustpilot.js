export function usseTrustpilot(){
  let element = document.getElementsByClassName("trustpilot-widget");
    for(var i=0; i<element.length; i++) {
    if(element[i] && window.Trustpilot)
    window.Trustpilot.loadFromElement(element[i]);
  }
}