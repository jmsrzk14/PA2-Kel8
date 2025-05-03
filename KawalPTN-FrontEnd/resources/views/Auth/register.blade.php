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

    <link href="{{asset('/FrontEnd/css/style.css')}}" rel="stylesheet">
</head>

<body class="bg-light">

    <div class="container py-5">
        <!-- Pills navs -->
        <div class="d-flex justify-content-center gap-2 mb-3">
            <a href="/login" class="btn btn-outline-primary btn-floating">
                <i class="fas fa-sign-in-alt me-1"></i> Login
            </a>
            <a href="/register" class="btn btn-outline-success btn-floating">
                <i class="fas fa-user-plus me-1"></i> Register
            </a>
        </div>
        <!-- Pills navs -->

        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow rounded-4">
                    <div class="card-body">
                        <form>
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

                            <div class="mb-3">
                                <label for="registerPassword" class="form-label">Password</label>
                                <input type="password" class="form-control" id="registerPassword">
                            </div>

                            <div class="mb-3">
                                <label for="registerRepeatPassword" class="form-label">Repeat Password</label>
                                <input type="password" class="form-control" id="registerRepeatPassword">
                            </div>

                            <div class="form-check d-flex justify-content-center mb-3">
                                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked>
                                <label class="form-check-label" for="registerCheck">
                                    I have read and agree to the terms
                                </label>
                            </div>

                            <a type="submit" class="btn btn-outline-primary btn-floating w-100" href="/login">Sign up</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

</body>

</html>