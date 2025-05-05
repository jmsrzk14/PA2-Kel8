<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Kawal PTN</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <link href="{{asset('/FrontEnd/img/kawalbg.png')}}" rel="icon">

    <link href="{{asset('/FrontEnd/css/style.css')}}" rel="stylesheet">
</head>

<body class="bg-dark d-flex justify-content-center align-items-center min-vh-100">

    <div class="container py-5">
        <!-- Pills navs -->
        <div class="d-flex justify-content-center gap-2 mb-3">
            <a href="/login" class="btn btn-outline-primary btn-floating">
                <i class="fas fa-sign-in-alt me-1"></i> Login
            </a>
            <a href="/register" class="btn btn-outline-warning btn-floating">
                <i class="fas fa-user-plus me-1"></i> Register
            </a>
        </div>
        <!-- Pills navs -->

        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow rounded-4">
                    <div class="card-body">
                        <form id="registerForm" method="POST" action="/register">
                            @csrf
                            <div class="text-center mb-3">
                                <a class=""><img class="auth-logo" src="{{asset('/FrontEnd/img/steganography.bmp')}}"></a>
                                <br>
                                <h4 class="card-title text-center mb-4">Buat Akun</h4>
                                <p>Sign up with:</p>
                                <button type="button" class="btn btn-outline-primary btn-floating mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-floating mx-1">
                                    <i class="fab fa-google"></i>
                                </button>
                                <button type="button" class="btn btn-outline-info btn-floating mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>
                                <button type="button" class="btn btn-outline-dark btn-floating mx-1">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>

                            <p class="text-center">or:</p>

                            <div class="mb-3">
                                <label for="registerName" class="form-label">Name</label>
                                <input type="text" class="form-control" id="registerName">
                            </div>

                            <div class="mb-3">
                                <label for="registerUsername" class="form-label">Username</label>
                                <input type="text" class="form-control" id="registerUsername">
                            </div>

                            <div class="mb-3">
                                <label for="registerEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="registerEmail">
                            </div>

                            <div class="mb-3 position-relative">
                                <label for="registerPassword" class="form-label">Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="registerPassword">
                                    <span class="input-group-text toggle-password" style="cursor: pointer;">
                                        <i class="fa fa-eye-slash" id="togglePassIcon"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="mb-3 position-relative">
                                <label for="registerRepeatPassword" class="form-label">Repeat Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="registerRepeatPassword">
                                    <span class="input-group-text toggle-password" style="cursor: pointer;">
                                        <i class="fa fa-eye-slash" id="toggleRepeatIcon"></i>
                                    </span>
                                </div>
                                <div id="passwordError" class="text-danger small mt-1 d-none">Password tidak cocok</div>
                            </div>

                            <div class="form-check d-flex justify-content-center mb-3">
                                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked>
                                <label class="form-check-label" for="registerCheck">
                                    I have read and agree to the terms
                                </label>
                            </div>

                            <button type="submit" class="btn btn-outline-primary btn-floating w-100" href="/login">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

</body>

<script>
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        const pass = document.getElementById('registerPassword').value;
        const repeat = document.getElementById('registerRepeatPassword').value;
        const errorEl = document.getElementById('passwordError');
        if (pass != repeat) {
            e.preventDefault();
            errorEl.classList.remove('d-none');
        } else {
            errorEl.classList.add('d-none');
        }
    });

    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });
</script>

</html>