import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.effect.BoxBlur;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.text.Font;
import javafx.scene.text.FontPosture;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

public class Main extends Application {

    final String title = "UniVerse";
    final int[] windowSize = {1280, 720};
    final int[] minSize = {640, 360};

    @Override
    public void start(Stage primaryStage) throws Exception{


        VBox root = new VBox();

        StackPane header = new StackPane();
        BorderPane headerBox = new BorderPane();
        HBox leftArea = new HBox();
        leftArea.setSpacing(30);
        StackPane navArea = new StackPane();

        leftArea.setAlignment(Pos.CENTER);

        Rectangle rect = new Rectangle();
        rect.widthProperty().bind(root.widthProperty());
        rect.setHeight(140);
        rect.setId("headerRect");
        rect.setFill(Color.valueOf("#4F4F4F"));


        HBox profileArea = new HBox();
        profileArea.setAlignment(Pos.CENTER);
        profileArea.setSpacing(10);
        ImageView profilePictureView = new ImageView(new Image("resources/img/logo.png", 100, 100, true, true));
        Button btn = new Button();
        String shape = "-fx-shape: 'M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'";
        btn.setStyle("-fx-background-color: white; " + shape);
        btn.setOnMouseEntered(e -> {
            btn.setStyle("-fx-background-color: #2F80ED; " + shape);
        });
        btn.setOnMouseExited(e -> {
            btn.setStyle("-fx-background-color: white; " + shape);
        });
        btn.setOnMousePressed(e -> {
            btn.setStyle("-fx-background-color: #629FF2; " + shape);
        });
        btn.setOnMouseReleased(e -> {
            btn.setStyle("-fx-background-color: #2F80ED; " + shape);
        });

        profileArea.getChildren().addAll(btn, profilePictureView);

        Image logo = new Image("resources/img/logo.png", 100, 100, true, true);
        ImageView logoView = new ImageView(logo);

        Image wallpaper = new Image("resources/img/wallpaper.jpg", 1280, 720, true, true);
        ImageView backgroundView = new ImageView(wallpaper);
        backgroundView.fitWidthProperty().bind(root.widthProperty());
        backgroundView.fitHeightProperty().bind(root.heightProperty());

        BoxBlur bb = new BoxBlur();
        bb.setIterations(0);

        backgroundView.setEffect(bb);

        Text text = new Text("UniVerse");
        text.setFont(Font.font("roboto", FontWeight.EXTRA_BOLD, FontPosture.REGULAR, 105));
        text.setFill(Color.valueOf("#ffffff"));
        text.setOpacity(0.1);

        HBox nav = new HBox();

        String[] navTexts = {"Bibliothek", "News", "Social Club"};
        Text[] navs = new Text[3];

        for(int i = 0; i < 3; i++){
            Text tempText = new Text(navTexts[i]);
            tempText.setFont(Font.font("Roboto", FontWeight.BLACK, FontPosture.REGULAR, 20));
            tempText.setFill(Color.WHITE);
            tempText.setOnMouseEntered(e -> {
                tempText.setFill(Color.valueOf("#2F80ED"));
            });
            tempText.setOnMouseExited(e -> {
                tempText.setFill(Color.WHITE);
            });
            tempText.setOnMousePressed(e -> {
                tempText.setFill(Color.valueOf("#629FF2"));
            });
            tempText.setOnMouseReleased(e -> {
                tempText.setFill(Color.valueOf("#2F80ED"));
            });
            navs[i] = tempText;
        }

        nav.getChildren().addAll(navs);
        nav.setAlignment(Pos.BOTTOM_CENTER);
        nav.setSpacing(50);
        nav.setPadding(new Insets(0, 0, 23, 0));

        navArea.getChildren().addAll(text, nav);

        header.getChildren().addAll(rect, headerBox);
        leftArea.getChildren().addAll(logoView, navArea);
        headerBox.setLeft(leftArea);
        headerBox.setRight(profileArea);
        headerBox.setPadding(new Insets(0, 20, 0, 20));
        //headerBox.setCenter(navArea);
        root.getChildren().addAll(header, backgroundView);

        Scene scene = new Scene(root, windowSize[0], windowSize[1]);

        primaryStage.setResizable(true);
        primaryStage.setMinWidth(minSize[0]);
        primaryStage.setMinHeight(minSize[1]);
        primaryStage.initStyle(StageStyle.DECORATED);
        primaryStage.setTitle(title);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
