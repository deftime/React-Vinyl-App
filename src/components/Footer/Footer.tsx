import "./footer.module.scss";

interface footerPropsType {
  text: string;
}

function Footer({ text }: footerPropsType) {
  return <footer>{text}</footer>;
}

export default Footer;
