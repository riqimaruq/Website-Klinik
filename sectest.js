<script>
const token = "secret123";

fetch("http://example.com/api", {
  method: "POST",
  body: JSON.stringify({ token })
});
</script>
