import { useRouter } from "next/router";
import { dispatcher } from "../redux/redux";

function CustomeLink({ children, href, callback, classname }) {
  const router = useRouter();

  const handlerClick = (e) => {
    e.preventDefault();
    router.push(href);
    document.querySelector("body").style.overflow = "visible";

    dispatcher({ type: "url", data: href.slice(1).split("/")[0] });

    if (callback && typeof callback === "function") {
      callback({});
    }
  };

  return (
    <a href={href} onClick={handlerClick} className={classname}>
      {children}
    </a>
  );
}

export default CustomeLink;
