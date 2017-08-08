package ritvikkhanna.hawtt;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class IntroActivity extends AppCompatActivity {
    Button b;
    EditText edt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intro);
        b=(Button)findViewById(R.id.button_gs);
        edt=(EditText)findViewById(R.id.edit_username);
        b.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent I= new Intent(IntroActivity.this,MainActivity.class);
                I.putExtra("user_name",edt.getText().toString());
                startActivity(I);
                finish();
            }
        });
    }
}
