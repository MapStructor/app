import { ButtonLink } from "@/app/models/button-link.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trash can icon

type ButtonLinkButtonProps = {
  authToken?: string,
  buttonLink: ButtonLink;
  onDelete: (id: string) => void;
};

export default function ButtonLinkButton({
  authToken,
  buttonLink,
  onDelete,
}: ButtonLinkButtonProps) {
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
         marginLeft: "60px",
      }}
    >
      <a
        href={buttonLink.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          flexGrow: 1,
        }}
      ><strong>
        <button
          style={{
            borderColor: "grey",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "5px 10px", 
            marginRight: "10px",
            width: "80%",
            textAlign: "center",
            color: "black", 
            backgroundColor: "white", 
            fontWeight: "normal", 
            fontSize: "14px", 
          }}
        >
          <FontAwesomeIcon
            icon={getFontawesomeIcon(FontAwesomeLayerIcons.LINK)}
            style={{ marginRight: "5px", color: "inherit" }} 
          />
          {buttonLink.label} {}
        </button>
        </strong>
      </a>
      {
        (authToken ?? '') !== '' && (
          <button
            onClick={() => onDelete(buttonLink.id)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "5px",
            }}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "", fontSize: "18px" }} />
          </button>
        )
      }
    </div>
  );
}
