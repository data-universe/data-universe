import { CSS3DObject } from 'three_examples/renderers/CSS3DRenderer';

function createBillboard(innerHtml) {
  const element = document.createElement('div');
  element.className = 'billboard';
  element.addEventListener('click', () => {
    if (element.style.display === 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  });
  element.style.display = 'block'; // 'none'; should be the default
  element.textContent = innerHtml;

  const object = new CSS3DObject(element);

  return object;
}

export { createBillboard };
