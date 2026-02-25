import { ContainerComponent, HeadingComponent } from './api/ComponentsAPI';

// ===== Api Test =====

const header = new ContainerComponent({ tag: 'header' });
header.setStyle({
  backgroundColor: 'violet',
  margin: 'auto',
  opacity: '0',
});

const title = new HeadingComponent({ content: 'ComponentsAPI' });
title.setStyle({ textAlign: 'center' });

header.setChildren(title);

if (header.element) document.body.append(header.element);
window.addEventListener('load', () => {
  header.show(true, 1000);
});

console.log(header);
