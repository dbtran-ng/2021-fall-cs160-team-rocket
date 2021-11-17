import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class WikiSuggest {
    public static void main(String[] args) throws Exception {
        // The Firefox driver supports javascript
//        String path = System.getProperty("user.dir");
//        System.out.println(path);
        System.setProperty("webdriver.gecko.driver","geckodriver");
//        System.setProperty("webdriver.gecko.driver", "/Users/masakikudo/Downloads/geckodriver");
        WebDriver driver = new FirefoxDriver();

        // Go to the Google Suggest home page
        driver.get("https://www.wikipedia.org");

        // Enter the query string "Cheese"
        WebElement query = driver.findElement(By.name("search"));
        query.sendKeys("Selenium");

        // Sleep until the div we want is visible or 5 seconds is over
        long end = System.currentTimeMillis() + 5000;
        while (System.currentTimeMillis() < end) {

            //findElement would throw a NoSuchElement exception if the element is not present. Using findElements is a better approach
            ArrayList<WebElement> resultsDiv = (ArrayList<WebElement>) driver.findElements(By.xpath("//div[@class='suggestions-dropdown']/*"));
            // If results have been returned, the results are displayed in a drop down.
            if (resultsDiv.size()>0) {
                break;
            }
        }

        // And now list the suggestions
        List<WebElement> allSuggestions = driver.findElements(By.xpath("//div[@class='suggestions-dropdown']/*"));

        for (WebElement suggestion : allSuggestions) {
            System.out.println(suggestion.getText());
            if(suggestion.getText().contains("software")){
                suggestion.click();
                break;
            }
        }

        end = System.currentTimeMillis() + 5000;
        while (System.currentTimeMillis() < end) {

        }

//        String wikiText = driver.findElement(By.xpath("//*[@id=\"mw-content-text\"]/div/p[1]")).getText();
//        System.out.println(wikiText);

        driver.quit();
    }
}